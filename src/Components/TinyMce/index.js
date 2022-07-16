import React, { useRef } from 'react';
// Tiny Mce
import { Editor } from '@tinymce/tinymce-react';

const TinyMce = React.forwardRef((props,ref) => {
  return (
    <>
    <Editor 
    onInit={(evt, editor) => ref.current = editor}
    initialValue={!props?.editValue ? "<p>Start Creating Your Story Now!</p>" : props.editValue}
    init={{
      height: 500,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
    />
    </>
  )
})

export default TinyMce