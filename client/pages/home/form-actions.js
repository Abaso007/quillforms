/**
 * QuillForms Dependencies
 */
import { getNewPath, getHistory } from '@quillforms/navigation';

/**
 * WordPress Dependencies
 */
import { DropdownMenu, MenuItem, MenuGroup } from '@wordpress/components';
import { moreHorizontal } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';

const FormActions = ( { formId, setIsDeleting } ) => {
	const { deleteEntityRecord } = useDispatch( 'core' );
	return (
		<div
			role="presentation"
			className="quillforms-home-form-actions"
			onClick={ ( e ) => e.stopPropagation() }
		>
			<DropdownMenu
				icon={ moreHorizontal }
				position="bottom left"
				className="quillforms-home-form-actions__dropdown"
			>
				{ ( { onClose } ) => (
					<MenuGroup className="quillforms-home-form-actions__menu-group">
						<MenuItem
							className="quillforms-home-form-actions__menu-item"
							onClick={ () => {
								const history = getHistory();
								history.push(
									getNewPath(
										{},
										`/forms/${ formId }/builder`
									)
								);
							} }
						>
							Edit
						</MenuItem>
						<MenuItem
							className="quillforms-home-form-actions__menu-item quillforms-home-form-actions__delete-form"
							onClick={ async () => {
								setIsDeleting( true );
								const res = await deleteEntityRecord(
									'postType',
									'quill_forms',
									formId
								);
								console.log( res );
								onClose();
							} }
						>
							Move to trash
						</MenuItem>
					</MenuGroup>
				) }
			</DropdownMenu>
		</div>
	);
};

export default FormActions;