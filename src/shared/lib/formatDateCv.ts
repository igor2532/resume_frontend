type DateFormat = 'YYYY-MM' | 'YYYY';

export function formatDateCv(dateString: string, format: DateFormat): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return null;
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  switch (format) {
    case 'YYYY-MM':
      return `${year}-${month}`;
    case 'YYYY':
      return `${year}`;
    default:
      throw new Error('Unsupported format. Supported formats are YYYY-MM and YYYY.');
  }
}
