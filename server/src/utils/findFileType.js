async function findFileType() {
  try {
    const fileType = await import('file-type');

    return fileType;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  findFileType,
};
