import { Column } from 'components/Table/Table';

export const personsColumns: Array<Column> = [
    { label: 'person:name', property: 'person:display_id1' },
    { label: 'person:client_number', property: 'person:client_number' },
    { label: 'person:country_code', property: 'postal_address:country_code' },
    { label: 'person:postal_code', property: 'postal_address:postal_code' },
    { label: 'person:birth_date_alt', property: 'person:birth_date', type: 'date' }
];