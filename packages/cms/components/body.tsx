import { RichText, type RichTextProps } from 'basehub/react-rich-text';

export const Body = ({
  content,
  components,
}: {
  content?: RichTextProps['content'];
  components?: RichTextProps['components'];
}) => {
  return (
    <RichText
      content={content}
      components={{
        ul: ({ children, isTasksList, ...props }) => (
          <ul {...props}>{children}</ul>
        ),
        ...components,
      }}
    />
  );
};
