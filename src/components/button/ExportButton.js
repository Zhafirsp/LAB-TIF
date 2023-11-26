import * as XLSX from "xlsx-js-style";

function ExportButton({ excelData, fileName }) {
  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    excelData.forEach((item) => {
      const worksheet = XLSX.utils.json_to_sheet(item.data);
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        `Pertemuan ${item.pertemuan}`
      );
    });

    return XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <>
      <button
        className="btn btn-primary col-md-4 offset-md-8 my-4"
        onClick={() => {
          exportExcel();
        }}
      >
        Cetak Kehadiran
      </button>
    </>
  );
}

export default ExportButton;
