import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Observable } from 'rxjs';
import { SortByEnum } from 'src/app/core/enum/sort-data.enum';
import { BaseOption } from 'src/app/core/models/base-option.model';
import { environment } from 'src/environments/environment';
import * as filterDropdown from '../../../core/models/list-value/list-key-value.model'
import { ArtWorkListContent, ArtWorkListSearchCriteria } from '../models/artwork.model';
import { ArtWorkModuleStates } from '../store/art-work-module.states';
import { ArtWorkListRequestAction } from '../store/art-work.actions';
import { ArtWorkState } from '../store/art-work.reducers';
import { selectAllArtWorkList, selectArtWorkList, selectArtWorkListCriteria } from '../store/art-work.selectors';
import * as _ from 'lodash';

@Component({
  selector: 'app-art-work-list',
  templateUrl: './art-work-list.component.html',
  styleUrls: ['./art-work-list.component.css']
})

export class ArtWorkListComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  sortByType = filterDropdown.sortByType;
  filterBy: any[] = [];
  criteriaObject: ArtWorkListSearchCriteria;
  localStore: Observable<any>;
  resultList$: Observable<ArtWorkListContent[]>;
  resultList: ArtWorkListContent[] = [];
  listState$: Observable<ArtWorkState>;
  count: number;
  page: number = 1;
  perPage: number = 12;
  currentPage: number = 1;

  constructor(protected readonly store: Store<ArtWorkModuleStates>) {
    this.searchForm = new FormBuilder().group({
      filterBy: [''],
      sortBy: [''],
    });
  }

  ngOnInit(): void {
    this.localStore = this.store.pipe(untilComponentDestroyed(this));
    this.setFirstPage();
    this.setInitialCriteriaObject();
    this.search(this.criteriaObject);
    this.setInitState();
  }

  ngDoCheck() {
    this.localStore
      .pipe(select(selectAllArtWorkList))
      .subscribe((criteriaObject) => {
        this.resultList = criteriaObject;
      });

    if (this.searchForm.controls['filterBy'].value.length > 0) {
      this.resultList = this.resultList.filter((data: any) => this.searchForm.controls['filterBy'].value.some((element: any) => element === data.style_title))
    }
  }

  ngOnDestroy(): void { }

  search(criteriaObj: any) {
    this.store.dispatch(new ArtWorkListRequestAction(criteriaObj));
  }

  setFirstPage() {
    this.currentPage = 1;
  }

  setInitialCriteriaObject() {
    this.criteriaObject = {
      ...({} as ArtWorkListSearchCriteria),
      searchCriteria: '',
      page: 0,
      size: 12
    };
  }

  setInitState() {
    this.localStore
      .pipe(select(selectArtWorkListCriteria))
      .subscribe((criteriaObject) => {
        if (criteriaObject.total) {
          this.currentPage = criteriaObject.page! + 1;
          this.count = criteriaObject.total!;
        }
      });

    this.resultList$ = this.store.select(selectAllArtWorkList);
    this.listState$ = this.store.select(selectArtWorkList);
    this.localStore
      .pipe(select(selectAllArtWorkList))
      .subscribe((criteriaObject) => {
        this.resultList = criteriaObject;
      });

    this.resultList$.pipe(untilComponentDestroyed(this)).subscribe(dataResult => {
      const mapObjectFilter = new Map();
      this.filterBy = [];
      dataResult.forEach(dataForEach => {
        dataForEach.style_titles.forEach((element: any) => {
          let countObject = mapObjectFilter.get(element)

          if (countObject === undefined) {
            countObject = 0;
          }
          countObject = countObject + 1;
          mapObjectFilter.set(element, countObject)
        })
      })

      for (const [_key, value] of Object.entries(Object.fromEntries(mapObjectFilter))) {
        this.filterBy.push({
          label: `${_key} (${value})`,
          value: _key
        });
      }
    })
  }

  selectLabel(option: BaseOption): string {
    return option.label;
  }

  selectValue(option: BaseOption): string {
    return option.value;
  }

  onChangeSortBy(value: any) {
    switch (value) {
      case SortByEnum.NAME:
        this.sortByName(); break;
      case SortByEnum.ARTIST:
        this.sortByArtist(); break;
      case SortByEnum.DATE:
        this.sortByDate(); break;
      default:
        break;
    }
  }

  sortByDate() {
    this.resultList$.pipe(untilComponentDestroyed(this)).subscribe(dataResult => {
      dataResult.sort((a, b) => {
        let dateA = (a.date_start) ? Number(a.date_start) : Number(a.date_end);
        let dateB = (b.date_start) ? Number(b.date_start) : Number(b.date_end);
        return dateA - dateB;
      });
    })
  }

  sortByArtist() {
    this.resultList$.pipe(untilComponentDestroyed(this)).subscribe(dataResult => {
      dataResult.sort((a, b) => {
        let artistTitleA = a.artist_title;
        let artistTitleB = b.artist_title;
        if (artistTitleA < artistTitleB) {
          return -1;
        }
        if (artistTitleA > artistTitleB) {
          return 1;
        }
        return 0;
      });
    })
  }

  sortByName() {
    this.resultList$.pipe(untilComponentDestroyed(this)).subscribe(dataResult => {
      dataResult.sort((a, b) => {
        let titleA = a.title.toUpperCase();
        let titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    })
  }

  prevPage() {
    this.page--;
    this.criteriaObject = {
      ...this.criteriaObject,
      page: this.page
    };
    this.search(this.criteriaObject);
    this.searchForm.controls['filterBy'].setValue([]);
    this.onChangeSortBy(this.searchForm.controls['sortBy'].value);
  }

  nextPage() {
    this.page++;
    this.criteriaObject = {
      ...this.criteriaObject,
      page: this.page
    };
    this.search(this.criteriaObject);
    this.searchForm.controls['filterBy'].setValue([]);
    this.onChangeSortBy(this.searchForm.controls['sortBy'].value);
  }

  goToPage(n: number) {
    this.page = n;
    this.criteriaObject = {
      ...this.criteriaObject,
      page: n
    };
    this.search(this.criteriaObject);
    this.searchForm.controls['filterBy'].setValue([]);
    this.onChangeSortBy(this.searchForm.controls['sortBy'].value);
  }
}
