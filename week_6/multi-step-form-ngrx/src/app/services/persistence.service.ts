import { Injectable } from '@angular/core';
import { FormState } from '../state/form/form.state';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  set(key: string, data: FormState): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving to localStorage, ${error}`);
    }
  }

  get(key: string): FormState {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem
        ? JSON.parse(localStorageItem)
        : ({} as FormState);
    } catch (error) {
      console.error(`Error getting from local storage, ${error}`);
      return {} as FormState;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from local storage, ${error}`);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing local storage, ${error}`);
    }
  }
}
