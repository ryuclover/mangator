import JSZip from 'jszip';

export async function downloadChapterZip(
  mangaTitle: string,
  chapterNumber: number,
  pageUrls: string[]
): Promise<void> {
  const zip = new JSZip();
  const folderName = `${mangaTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Cap_${chapterNumber}`;
  const folder = zip.folder(folderName);

  if (!folder) return;

  // Fetch each image blob and append to zip
  for (let i = 0; i < pageUrls.length; i++) {
    const url = pageUrls[i];
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const pageNumber = String(i + 1).padStart(2, '0');
      folder.file(`pagina_${pageNumber}.jpg`, blob);
    } catch (err) {
      console.error(`Erro ao baixar página ${i + 1}:`, err);
    }
  }

  // Generate zip file and prompt download
  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = `${folderName}.zip`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}
