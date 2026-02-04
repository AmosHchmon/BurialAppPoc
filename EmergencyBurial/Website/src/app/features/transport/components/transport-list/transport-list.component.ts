import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TransportList} from '../../model/TransportList';
import {TransportService} from '../../services/transport.service';
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Table} from "primeng/table";
import {CreateTransportDialogComponent} from "../create-transport-dialog/create-transport-dialog.component";

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  imports: [UiComponentsModule, CreateTransportDialogComponent],
  styleUrls: ['./transport-list.component.scss'],
  providers: [ConfirmationService] // חובה עבור דיאלוג האישור
})
export class TransportListComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  // נתונים
  transports: TransportList[] = [];
  selectedTransport: TransportList | null = null;
  loading: boolean = true;
  searchText: string = '';

  // משתנה לשליטה על דיאלוג היצירה
  isCreateDialogOpen: boolean = false;

  // הגדרת עמודות (לשימוש ב-HTML)
  cols: any[] = [
    {field: 'id', header: '#'},
    {field: 'startDateTime', header: 'יציאה'},
    {field: 'destination', header: 'יעד'},
    {field: 'purposeDesc', header: 'תכלית'},
    {field: 'driverDetails', header: 'נהג'},
    {field: 'totalBags', header: 'שקים'},
    {field: 'isCompleted', header: 'סטטוס'},
  ];

  constructor(
    private transportService: TransportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * טעינת הנתונים מהשרת
   */
  async loadData() {
    this.loading = true;
    try {
      this.transports = await this.transportService.getTransports();
    } catch (error) {
      this.messageService.add({severity: 'error', summary: 'שגיאה', detail: 'לא ניתן לטעון נתונים'});
    } finally {
      this.loading = false;
    }
  }

  // --- Actions ---

  /**
   * פתיחת דיאלוג יצירת שינוע
   */
  onCreateTransport() {
    this.isCreateDialogOpen = true;
  }

  /**
   * אירוע שחוזר מהדיאלוג לאחר שמירה מוצלחת
   */
  onTransportSaved() {
    this.isCreateDialogOpen = false; // סגירת הדיאלוג
    this.loadData(); // רענון הגריד כדי לראות את הרשומה החדשה
  }

  /**
   * סיום שינוע (End Transport)
   */
  onEndTransport() {
    if (!this.selectedTransport) return;

    this.confirmationService.confirm({
      message: 'האם אתה בטוח שברצונך לסיים את השינוע שנבחר? פעולה זו תשחרר את השקים מהרכב.',
      header: 'אישור סיום שינוע',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'כן, סיים שינוע',
      rejectLabel: 'ביטול',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-text',
      accept: async () => {
        try {
          await this.transportService.endTransport(this.selectedTransport!.Id);
          this.messageService.add({severity: 'success', summary: 'בוצע', detail: 'השינוע הסתיים בהצלחה'});

          this.selectedTransport = null; // איפוס הבחירה
          this.loadData(); // ריענון הנתונים
        } catch (e) {
          this.messageService.add({severity: 'error', summary: 'שגיאה', detail: 'אירעה שגיאה בסיום השינוע'});
        }
      }
    });
  }

  /**
   * עריכת פרטים (Placeholder)
   */
  onEditDetails() {
    if (!this.selectedTransport) return;

    this.messageService.add({severity: 'info', summary: 'בפיתוח', detail: 'פונקציונליות עריכה תתווסף בקרוב'});
    // בעתיד: this.isEditDialogVisible = true;
  }

  // --- Helpers ---

  /**
   * ניקוי חיפוש ופילטרים
   */
  clearSearch() {
    this.searchText = '';
    this.dt.reset(); // ניקוי הפילטרים של הטבלה
  }

  /**
   * שדות עליהם יתבצע הסינון הגלובלי
   */
  getGlobalFilterFields(): string[] {
    return ['id', 'destination', 'driverDetails', 'licensePlate', 'startLocation', 'bagNumbers'];
  }

  /**
   * צבע התגית לפי סטטוס
   */
  getStatusSeverity(isCompleted: boolean): string {
    return isCompleted ? 'secondary' : 'success';
  }

  /**
   * טקסט התגית לפי סטטוס
   */
  getStatusLabel(isCompleted: boolean): string {
    return isCompleted ? 'הסתיים' : 'פעיל';
  }
}
