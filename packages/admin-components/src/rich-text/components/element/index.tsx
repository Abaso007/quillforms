/**
 * External Dependencies
 */
import { ReactEditor, RenderElementProps } from 'slate-react';

/**
 * Internal Dependencies
 */
import MergeTagComponent from '../merge-tag';
import type { MergeTags, Link, CustomElement } from '../../types';

interface Props extends RenderElementProps {
	editor: ReactEditor;
	mergeTags: MergeTags;
	element: CustomElement;
}
const Element: React.FC<Props> = ({
	attributes,
	children,
	element,
	editor,
	mergeTags,
}) => {
	const path = ReactEditor.findPath(editor, element);
	switch (element.type) {

		case 'mergeTag':
			return (
				<MergeTagComponent
					element={element}
					mergeTags={mergeTags}
					editor={editor}
					path={path}
					attributes={attributes}
					children={children}
				/>
			);
		case 'link':
			return (
				<a {...attributes} href={(element as Link).url}>
					{children}
				</a>
			);
		default:
			return <p {...attributes}>{children}</p>;
	}
};
export default Element;
