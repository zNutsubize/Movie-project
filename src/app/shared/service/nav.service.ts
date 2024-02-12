import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  mustOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  resetValue$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  navAppear$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  mustOpen(): BehaviorSubject<boolean> {
    return this.mustOpen$;
  }
  resetValue(): BehaviorSubject<boolean> {
    return this.resetValue$;
  }
  navAppear(): BehaviorSubject<boolean> {
    return this.navAppear$;
  }

  constructor() {}
}
