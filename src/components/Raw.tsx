

export function Raw({content}: {content?: string}) {
  return <div dangerouslySetInnerHTML={{__html: content || ''}} />;
}
