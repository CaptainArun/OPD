import { Component, OnInit } from "@angular/core";
import { ConfigurationService } from '../../configuration.service';
import { CustomHttpService } from '../../../core/custom-http.service';
import { UtilService } from '../../../core/util.service';
import { addidenticationIdType } from "../../master-data/identification-id-type/add-identification-id-type/add-identifcation-id-type.component";
import { TableConfig } from "src/app/ux/columnConfig";
import { MatDialog } from "@angular/material/dialog";
import { BMSMessageBoxColorMode, BMSMessageBoxMode } from "src/app/ux/bmsmsgbox/bmsmsgbox.component";
@Component({
    selector: "app-identificationidtype",
    styleUrls: ["./identification-id-type.component.css"],
    templateUrl: './identification-id-type.component.html'
  })

export class IdentificationidTypeComponent implements OnInit{

  //#region "Property Declaration"
  tableConfig: TableConfig = new TableConfig();
  identificationformgrid:any;
  //#endregion


  //#region "constructor"
  constructor(
    public dialog: MatDialog,
    public configurationservice: ConfigurationService,
    private config: UtilService,
    public customhttp: CustomHttpService,
  ) {
    this.tableConfig.showPagination = true;
    this.tableConfig.showView = false;
    this.tableConfig.showIcon = false;
    this.tableConfig.showEdit = true;
    this.tableConfig.showAdd = false;
    this.tableConfig.showDelete = true;
    this.tableConfig.columnConfig = [
    {
        PropertyName: "IDTCode", DisplayName: "Code",DisplayMode: "Text", LinkUrl: "",width: "15%",
      },
      {
        PropertyName: "IDTDescription",DisplayName: "Description",DisplayMode: "Text",LinkUrl: "",width: "60%"
      },
      {
        PropertyName: "OrderNo", DisplayName: "order",DisplayMode: "Text",LinkUrl: "",width: "15%"
      }
    ];

  }   
   //#endregion


  //#region "ngOnInit"  
  ngOnInit() {
    this.customhttp.getDbName(localStorage.getItem('DatabaseName'));
    this.getidentificationFormGridData();
  }
  //#endregion
 
  //#region "get data for grid"  
  getidentificationFormGridData(){
    this.configurationservice.getIdentificationIdType().then((res)=>{
    this.identificationformgrid=res;
    }
    );
   }
    //#endregion

  //#region "add new data to Table"
   // add new data to Table
   openidentification(){
     const addNewPopup = this.dialog.open(addidenticationIdType, {      
      height: "auto",
      width: "25%",
      autoFocus: false,
    });
    addNewPopup.afterClosed().subscribe((result) => {
      if (result == "Updated") {   
        this.getidentificationFormGridData();
      }
    });
  } 
  //#endregion

   //#region "Edit/Update Data of Table"
   openEditidentification(element: any) {
    this.configurationservice
      .getIdentificationId(element.Item.IDTId)      
      .then((res) => {
        var editRecord= res;
        let editDetails = this.dialog.open(addidenticationIdType, {
          data: editRecord,
          height: "auto",
          width: "25%",
          autoFocus: true,
        });
        editDetails.afterClosed().subscribe((result) => {
          if (result == "Updated") {
            this.getidentificationFormGridData();
          }
        });
      });
  }
   //#endregion

      //#region "delete record"
      deleteidentification(element: any) {
        this.config
          .showMessage(
            "Delete",
            "Are you sure want to delete this item? This action cannot be undone.",
            BMSMessageBoxColorMode.Information,
            BMSMessageBoxMode.ConfrimBox
          )
          .then((res: any) => {
            if (res == true) {
              this.configurationservice
                .deleteIdentificationId(element.Item.IDTId)
                .then((res) => {
                    this.getidentificationFormGridData();
                });
            }
          });
      }
       //#endregion  

}
