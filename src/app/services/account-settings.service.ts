import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountSettingsService {

    constructor(private http: HttpClient) { }

    getUserMinistries(): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:50868/api/UserMinistries/1');
    }

    getUserMinistriesAbbreviations(): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:50868/api/UserMinistries/1/abbreviations');
    }

    saveUserMinistrySelections(userMinistries: Array<string>) {
        return this.http.post('http://localhost:50868/api/UserMinistries', { ministries: userMinistries });
    }
}
