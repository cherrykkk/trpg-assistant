import ReactDOM from "react-dom/client";
import {RichTextExample, ReadOnlyExample} from "./RichText";
import { createEditor, Descendant } from 'slate'

export function createRichTextEditor(el: HTMLElement, _initialValue: Descendant[]) {
    const initialValue = JSON.parse(JSON.stringify(_initialValue))
    ReactDOM.createRoot(el).render(<RichTextExample initialValue={initialValue} />);
}

export function createRichTextRenderer(el: HTMLElement, _initialValue: Descendant[]) {
    const initialValue = JSON.parse(JSON.stringify(_initialValue))
    ReactDOM.createRoot(el).render(<ReadOnlyExample initialValue={initialValue} />);
}


  