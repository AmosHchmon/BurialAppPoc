import {Component, EventEmitter, Input, Output} from '@angular/core';
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
}
