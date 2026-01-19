import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common'; // הוספת CommonModule עבור ה-Pipes
import {ButtonDirective} from "primeng/button";
import {Chip} from "primeng/chip";
import {Dialog} from "primeng/dialog";
import {FloatLabel} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {IMember} from "../../../shared/model/member";
import {UiComponentsModule} from "../../../shared/ui-components/ui-components.module";
import {AuthContextService} from "../../../shared/services/auth-context.service";
import {enmRoleAccessType} from "../../../shared/enum/role-type.enum";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    UiComponentsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  @Input() visible: boolean = false;
  @Input() profileData: IMember = {};
  @Input() isEditMode: boolean = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<IMember>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onEditModeChange = new EventEmitter<boolean>();

  roleConfigs = {
    [enmRoleAccessType.Admin]: {icon: 'pi pi-shield', label: 'מנהל'},
    [enmRoleAccessType.Editor]: {icon: 'pi pi-pencil', label: 'עורך'},
    [enmRoleAccessType.Viewer]: {icon: 'pi pi-eye', label: 'צופה'}
  };

  constructor(public authCtx: AuthContextService) {
  }

  get currentRole() {
    return this.roleConfigs[this.profileData.RoleAccessTypeId];
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  setEditMode(mode: boolean) {
    this.onEditModeChange.emit(mode);
  }

  save() {
    this.onSave.emit(this.profileData);
  }

  cancel() {
    this.onCancel.emit();
  }

  protected readonly enmRoleAccessType = enmRoleAccessType;
}
