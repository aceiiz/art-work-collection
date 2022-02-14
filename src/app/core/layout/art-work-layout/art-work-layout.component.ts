import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';
import { select, Store } from '@ngrx/store';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Subscription } from 'rxjs';
import { LayoutActionErrorUpdate } from '../../store/action/layout.action';
import { selectLayoutState } from '../../store/selectors/layout-selector';
import { AppStates } from '../../store/state/app.states';


@Component({
  selector: 'app-layout',
  templateUrl: './art-work-layout.component.html',
  styleUrls: ['./art-work-layout.component.css']
})
export class ArtworkLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('errorMessageTemplate') errorMessageTemplateRef: TemplateRef<any>;
  dialogRef?: NxModalRef<any, any>;

  isGeneralError: Subscription;
  isAlreadyDisplayError: boolean;
  msgDisplay: string;

  constructor(private readonly store: Store<AppStates>, protected readonly dialogService: NxDialogService) { }

  ngOnInit(): void {
    this.isGeneralError = this.store
      .pipe(untilComponentDestroyed(this), select(selectLayoutState))
      .subscribe((layoutError) => {
        let initialState = null;

        if (layoutError.isApiError && !this.isAlreadyDisplayError) {
          if (
            layoutError.errorResponse?.error &&
            layoutError.errorResponse?.error.message
          ) {
            this.isAlreadyDisplayError = true;
            initialState = {
              title: 'Failed',
              message: layoutError.errorResponse.error.message,
              isRefresh: true
            };
          } else {
            this.isAlreadyDisplayError = true;
            initialState = {
              title: 'Error',
              message: 'There is something went wrong!!! Please try again later.',
              isRefresh: true
            };
          }
        }

        if (initialState) {
          this.openErrorMessageDialog(initialState);
        }
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new LayoutActionErrorUpdate(false));
  }

  openErrorMessageDialog(initialState: any): void {
    this.msgDisplay = initialState.message;
    this.dialogRef = this.dialogService.open(this.errorMessageTemplateRef, {
      ariaLabel: 'A modal with content',
      showCloseIcon: false,
      disableClose: true
    });
  }

  closeDialog() {
    this.dialogRef?.close();
    this.isAlreadyDisplayError = false;
  }
}
