import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'student',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  
  constructor(){}

  ngOnInit(): void {} 



}
