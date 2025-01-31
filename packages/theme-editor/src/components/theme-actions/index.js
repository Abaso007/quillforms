/**
 * WordPress Dependencies
 */
import { useDispatch } from '@wordpress/data';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { moreHorizontal } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

const ThemeActions = ({ id, themeTitle, themeProperties }) => {
	const { setCurrentTab } = useDispatch('quillForms/theme-editor');
	const { deleteTheme, addNewTheme, setCurrentThemeId, setShouldBeSaved } =
		useDispatch('quillForms/theme-editor');

	return (
		<div
			role="presentation"
			className="theme-editor-theme-actions"
			onClick={(e) => e.stopPropagation()}
		>
			<DropdownMenu
				popoverProps={{
					placement: 'bottom-start',
				}}
				icon={moreHorizontal}
				className="theme-editor-theme-actions__dropdown"
			>
				{({ onClose }) => (
					<MenuGroup className="theme-editor-theme-actions__menu-group">
						<MenuItem
							className="theme-editor-theme-actions__menu-item"
							onClick={() => {
								setCurrentThemeId(id);
								setCurrentTab('customize');
								setShouldBeSaved(false);
							}}
						>
							Customize
						</MenuItem>
						<MenuItem
							className="theme-editor-theme-actions__menu-item"
							onClick={() => {
								addNewTheme(
									themeTitle + '-copy',
									themeProperties
								);
								onClose();
							}}
						>
							{__('Duplicate', 'quillforms')}
						</MenuItem>
						<MenuItem
							className="theme-editor-theme-actions__menu-item theme-editor-theme-actions__delete-theme"
							onClick={() => {
								onClose();
								deleteTheme(id);
							}}
						>
							{__('Delete', 'quillforms')}
						</MenuItem>
					</MenuGroup>
				)}
			</DropdownMenu>
		</div>
	);
};
export default ThemeActions;
