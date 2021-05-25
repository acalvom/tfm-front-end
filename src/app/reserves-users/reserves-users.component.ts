import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Reserve} from '../shared/models/reserve.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reserves-users',
  templateUrl: './reserves-users.component.html',
  styleUrls: ['./reserves-users.component.css']
})
export class ReservesUsersComponent implements OnInit {

  columns: string[] = ['name', 'surname', 'dni'];
  dataSource = new MatTableDataSource<Reserve>();
  code: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
  }

}
