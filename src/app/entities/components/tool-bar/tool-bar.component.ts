import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  public items: number[] = [0, 1, 2, 3 ,4 ,5 ];

  constructor() { }

  ngOnInit(): void {
  }

}
