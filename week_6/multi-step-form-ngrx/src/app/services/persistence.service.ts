import { Injectable } from '@angular/core';
import { FormState } from '../state/form/form.state';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  public set(key: string, data: FormState): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving to localStorage, ${error}`);
    }
  }

  public get(key: string): FormState {
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

  public remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from local storage, ${error}`);
    }
  }

  public clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing local storage, ${error}`);
    }
  }
}
