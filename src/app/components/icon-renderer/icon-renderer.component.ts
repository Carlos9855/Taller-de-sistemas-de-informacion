import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-icon-renderer',
  templateUrl: './icon-renderer.component.html',
  styleUrls: ['./icon-renderer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IconRendererComponent implements ICellRendererAngularComp {

  params;
  icon: string;
  iconSanitizer;
  tooltip: string;
  color: string

  constructor(private sanitizer: DomSanitizer) {
     
   }

  agInit(params): void {
    this.params = params;
    this.icon = this.params.icon || null;
    this.tooltip = this.params.tooltip;
    this.color = this.params.color;

    
  }

  refresh(params?: any): boolean {
    return true;
  }

  ngOnInit(): void {
    this.iconSanitizer = this.sanitizer.bypassSecurityTrustHtml(this.icon);
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onClick(params);
    }
  }


   loadIcon(){



    console.log('no se porque no carga');
      const HTMLElement = document.getElementById('replace');
       HTMLElement.innerHTML = this.icon;
  
  }

}
