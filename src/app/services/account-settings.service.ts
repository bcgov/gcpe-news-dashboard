import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMinistry } from '../services/user-ministry';

@Injectable({
    providedIn: 'root'
})
export class AccountSettingsService {

    constructor(private http: HttpClient) { }

    getUserMinistries(): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:50868/api/UserMinistries/1');
    }

    saveUserMinistrySelections(userMinistries: Array<string>) {
        const userMinistry: UserMinistry = { ministries: userMinistries };
        return this.http.post('http://localhost:50868/api/UserMinistries', userMinistry);
    }
}
