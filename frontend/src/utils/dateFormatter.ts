export const formatDate = (timestamp: bigint | number | undefined | null) => {
  if (timestamp === undefined || timestamp === null) {
    return 'Date unavailable';
  }

  try {
    const date = new Date(typeof timestamp === 'bigint' ? Number(timestamp) / 1000000 : timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date unavailable';
  }
};
