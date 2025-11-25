import {IColumn} from "../ui-components/model/column";

export const deceasedFields: IColumn[] = [
  {field: 'HalalNumber', header: 'מספר חלל'},
  {field: 'IdentityNumber', header: 'מספר זהות'},
  {field: 'FirstName', header: 'שם פרטי'},
  {field: 'LastName', header: 'שם משפחה'},
  {field: 'FatherName', header: 'שם האב'},
  {field: 'Gender', header: 'מין'},
  {field: 'Nationality', header: 'לאום'},
  {field: 'HomeCity', header: 'עיר מגורים'},
  {field: 'PeleNumber', header: 'מספר פל"א'},
  {field: 'HomeAddress', header: 'כתובת מגורים'},
  {field: 'Notes', header: 'הערות כלליות'},
  {field: 'CreatedOn', header: 'נוצר בתאריך'}
]
export const bagDetailsFields: IColumn[] = [
  {field: 'Affiliation', header: 'ארגון שיוך'},
  {field: 'ReceivingStation', header: 'תחנת קליטה'},
  {field: 'LastKnownLocation', header: 'מיקום אחרון'},
  {field: 'PartDescription', header: 'תיאור חלק'},
  {field: 'RelatedBagNumbers', header: 'מספר שקים מקושרים'},
  {field: 'CanBeIdentifiedByAcquaintance', header: 'האם ניתן לזהות בהיכרות אישית'},
  {field: 'ReceivingNotes', header: 'הערות שנרשמו בעת הקליטה בתר"ח'},
  {field: 'FillerName', header: 'שם ממלא טופס הקליטה'},
  {field: 'ArrivalDateTime', header: 'תאריך ושעת ההגעה'},
  {field: 'BroughtBy', header: 'הגורם שהביא את השק'},
  {field: 'BroughtFrom', header: 'המיקום ממנו הובא השק'},
  {field: 'ObjectsOnDeceased', header: 'פרטים שנמצאו על החלל'}
]
export const burialDetailsFields: IColumn[] = [
  {field: 'BurialType', header: 'סוג קבורה'},
  {field: 'IsCivilBurial', header: 'האם קבורה אזרחית'},
  {field: 'BurialLicenseNumber', header: 'מספר רישיון קבורה'},
  {field: 'BurialLicenseScanned', header: 'רישיון קבורה סרוק'},
  {field: 'TaharahStatus', header: 'סטטוס טהרה'},
  {field: 'TaharahLocation', header: 'מקום טהרה'},
  {field: 'InCoffin', header: 'האם נקבר בארון'},
  {field: 'BodyConditionNotes', header: 'הערות על מצב הגופה'},
  {field: 'Block', header: 'גוש'},
  {field: 'Plot', header: 'חלקה'},
  {field: 'Row', header: 'שורה'},
  {field: 'Grave', header: 'קבר'}
]
