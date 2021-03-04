import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Planet } from '../model/planet';
import { PlanetServiceService } from '../services/planet-service.service';

@Component({
  selector: 'app-planet-form',
  templateUrl: './planet-form.component.html',
  styleUrls: ['./planet-form.component.less']
})
export class PlanetFormComponent implements OnInit {

  planet: Planet|undefined;
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private planetsService: PlanetServiceService) { }

  ngOnInit(): void {

  this.route.params
    .pipe(
      switchMap((params: Params) => this.planetsService.findAll().pipe(
        map( list => list.filter(p => p.firstName == params['name'])[0] )
      ))
    )
    .subscribe((planet:any) => this.planet = planet);
  this.planet!.contador!++;
  this.planetsService.save(this.planet!);
  }

}
