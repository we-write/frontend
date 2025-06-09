interface GetTextWithLineBreaksParams {
  htmlString: string;
}

const getTextWithLineBreaks = ({
  htmlString,
}: GetTextWithLineBreaksParams): string => {
  return htmlString
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\n{5,}/g, '\n\n\n\n')
    .replace(/^\n+|\n+$/g, '');
};

export default getTextWithLineBreaks;
