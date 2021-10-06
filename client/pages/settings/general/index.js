/**
 * QuillForms Dependencies.
 */
import { Button } from '@quillforms/admin-components';

/**
 * WordPress Dependencies
 */
import { CheckboxControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * External Dependencies
 */
import { css } from 'emotion';
import Loader from 'react-loader-spinner';

/**
 * Internal Dependencies
 */
import './style.scss';

const General = () => {
	const [ settings, setSettings ] = useState( null );
	const { createErrorNotice, createSuccessNotice } = useDispatch(
		'core/notices'
	);

	useEffect( () => {
		apiFetch( {
			path: `/qf/v1/settings?groups=general`,
			method: 'GET',
		} )
			.then( ( res ) => {
				setSettings( res.general );
			} )
			.catch( () => {
				setSettings( false );
			} );
	}, [] );

	const save = () => {
		apiFetch( {
			path: `/qf/v1/settings`,
			method: 'POST',
			data: settings,
		} )
			.then( () => {
				createSuccessNotice( '✅ Settings saved', {
					type: 'snackbar',
					isDismissible: true,
				} );
			} )
			.catch( ( err ) => {
				createErrorNotice( `⛔ ${ err ?? 'Error' }`, {
					type: 'snackbar',
					isDismissible: true,
				} );
			} );
	};

	return (
		<div className="quillforms-settings-general-tab">
			{ settings === null ? (
				<div
					className={ css`
						display: flex;
						flex-wrap: wrap;
						width: 100%;
						height: 100px;
						justify-content: center;
						align-items: center;
					` }
				>
					<Loader
						type="ThreeDots"
						color="#8640e3"
						height={ 50 }
						width={ 50 }
					/>
				</div>
			) : ! settings ? (
				<div className="error">Cannot load settings</div>
			) : (
				<div>
					<CheckboxControl
						label="Debug logging"
						checked={ settings.log_debug }
						onChange={ ( checked ) => {
							setSettings( ( settings ) => {
								return {
									...settings,
									log_debug: checked,
								};
							} );
						} }
					/>
					<div
						className={ css`
							text-align: center;
							margin-top: 20px;
						` }
					>
						<Button isPrimary onClick={ save }>
							Save
						</Button>
					</div>
				</div>
			) }
		</div>
	);
};

export default General;