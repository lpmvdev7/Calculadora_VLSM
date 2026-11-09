
import ExcelJS from "exceljs";

export default async function ExportExcel(data) {

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Resultados VLSM");

    // Definición de columnas
    worksheet.columns = [
        { header: "N Subred", key: "id", width: 12 },
        { header: "Hosts", key: "hosts", width: 12 },
        { header: "N Hosts", key: "nHosts", width: 12 },
        { header: "Red", key: "red", width: 18 },
        { header: "Broadcasts", key: "broadcast", width: 18 },
        { header: "Primera IP", key: "first", width: 18 },
        { header: "Ultima IP", key: "last", width: 18 },
        { header: "Prefijo", key: "prefix", width: 12 },
        { header: "Mascara", key: "mask", width: 20 }
    ];

    // Agregar información de las subredes
    data.forEach((subnet) => {
        worksheet.addRow({
            id: subnet.id,
            hosts: subnet.hosts_posibles,
            nHosts: subnet.numero_hosts,
            red: subnet.rango.First,
            broadcast: subnet.rango.Last,
            first: subnet.rango.First_usable,
            last: subnet.rango.Last_usable,
            prefix: subnet.prefijo_red,
            mask: subnet.mascara
        });
    });

    // Estilos de encabezados
    const headerRow = worksheet.getRow(1);

    headerRow.font = {
        bold: true,
        color: { argb: "FFFFFFFF" }
    };

    headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2563EB" }
    };

    headerRow.alignment = {
        horizontal: "center",
        vertical: "middle"
    };

    // Generar archivo XLSX
    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    // Descargar archivo
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Resultados_VLSM.xlsx";

    link.click();

    window.URL.revokeObjectURL(url);
}
