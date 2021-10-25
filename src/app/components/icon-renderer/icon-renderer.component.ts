import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-icon-renderer',
  templateUrl: './icon-renderer.component.html',
  styleUrls: ['./icon-renderer.component.scss']
})
export class IconRendererComponent implements ICellRendererAngularComp {

  params;
  icon: string;
  tooltip: string;
  color: string

  constructor() { }

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

}
