import {Component} from '@angular/core';
import {Router} from "@angular/router";

import {IUserOtp} from "../../../../shared/model/user-otp";
import {AuthService} from "../../../../shared/services/auth.service";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {AuthContextService} from "../../../../shared/services/auth-context.service";

@Component({
    selector: 'app-login',
    imports: [UiComponentsModule],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrl: './login.component.scss',
})
export class LoginComponent {

    public user: IUserOtp = {};

    constructor(private authService: AuthService,
                private authCtx: AuthContextService,
                private router: Router) {
    }

    async onLogin() {

        this.authCtx.Member = await this.authService.login(this.user);

        this.router.navigate(['/dashboard/home']);

    }

}
