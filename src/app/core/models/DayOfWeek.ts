export class DayOfWeek {
    name!: string;
    selected!: boolean;
    value!: number;
}

export class DaysOfWeek {
    data: DayOfWeek[] = [
        { name: 'S', value: 0, selected: false },
        { name: 'M', value: 1, selected: false },
        { name: 'T', value: 2, selected: false },
        { name: 'W', value: 3, selected: false },
        { name: 'T', value: 4, selected: false },
        { name: 'F', value: 5, selected: false },
        { name: 'S', value: 6, selected: false },
    ];
}
