import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-exelsheet',
  templateUrl: './exelsheet.component.html',
  styleUrls: ['./exelsheet.component.css']
})

export class ExelsheetComponent implements OnInit {

  data!: [][];
  datos: any;
  datosClientes: String[] = [
    'id',
    'nombre',
    'apellido',
    'telefono',
    'correo'
  ]
  constructor() { }

  ngOnInit(): void {
    this.datos = new MatTableDataSource<any>([])
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple file');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[1];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

    };
    reader.readAsBinaryString(target.files[0]);
  }

  cargarExcel(event: any) {
    let verificar = 0
    verificar = event.target.files.length
    if (verificar > 0) {
      const archivoSeleccionado = event.target.files[0];
      const leerArhivo = new FileReader()
      leerArhivo.readAsBinaryString(archivoSeleccionado);
      leerArhivo.onload = (events: any) => {
        let datosBinarios = events.target.result
        let libroTrabajo = XLSX.read(datosBinarios, { type: 'binary' });
        libroTrabajo.SheetNames.forEach(sheet => {
          this.datos = XLSX.utils.sheet_to_json(libroTrabajo.Sheets[sheet]);
          console.log(this.datos);
        })
      }
    }
  }
}
