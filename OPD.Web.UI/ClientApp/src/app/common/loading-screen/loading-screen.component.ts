import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { LoadingScreenService } from './loading-screen.service';

@Component({
  selector: 'app-LoadingSpinner',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  isLoadingImg: Subject<boolean>  = this.loadScreenSvc.isLoadingImg;

  constructor(private loadScreenSvc:LoadingScreenService) { }

  ngOnInit(): void {
  }

}
