export const getDateToday = (): string => {
    const now = new Date();
    return now.toISOString().split('T')[0];
};

export const getTimeNow = (): string => {
    const now = new Date();
    return now.toTimeString().split(' ')[0].slice(0, 5);
};

export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
}

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export const isDateInThePast = (selectedDate: string): boolean => {
    return new Date(selectedDate) < new Date(getDateToday());
};

export const isTimeInThePast = (selectedTime: string): boolean => {
    return selectedTime < getTimeNow();
};

export const getSupabaseDateTime = (date: string, time: string): string => {
    const dateTimeString = `${date}T${time}:00`;
    const dateTime = new Date(dateTimeString);
    return dateTime.toISOString();
};

export const getDateTimeFromSupabase = (dateTime: string): Date => {
    const date = new Date(dateTime);
    return date;
};