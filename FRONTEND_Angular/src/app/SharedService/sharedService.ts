import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable ({
        providedIn: 'root'
})

export class SharedService {
    private showLogged = new Subject<void>();
    showLogin$ = this.showLogged.asObservable();

    triggershowLogin(){
        this.showLogged.next();
    }

}