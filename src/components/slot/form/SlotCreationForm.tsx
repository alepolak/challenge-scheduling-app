'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from './SlotCreationForm.module.css';
import { getDateToday, getTimeNow, isDateInThePast, isTimeInThePast} from '@/utils/dateAndTime';
import { CalendarSlot } from '@/types/Calendar';
import { getAllSlots } from '@/services/slotService';
import { isSlotAvailable } from './utils';
import TextButton from '@/components/buttons/text-button/TextButton';
import { cancel, saveSlot } from './actions';

const SlotCreationForm: React.FC = (): JSX.Element => {
    const [slots, saveSlots] = useState<CalendarSlot[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [date, setDate] = useState<string>(getDateToday());
    const [time, setTime] = useState<string>(getTimeNow());

    // Handle date change
    function handleDateChange(event: ChangeEvent<HTMLInputElement>): void {
        console.log(`HANDLE DATE CHANGE`);
        console.log(`HANDLE DATE CHANGE --> slots: `, slots);
        if(slots) {
            if (isDateInThePast(event.target.value)) {
                setErrorMessage('The selected date cannot be in the past.');
                setDate(getDateToday());
                hideErrorMessage();
            } else if (isSlotAvailable(event.target.value, time, slots)){
                setErrorMessage('The slot for this date and time is not available');
                hideErrorMessage();
            } else {
                setDate(event.target.value);
            }
        }
    }

    // Handle time change
    function handleTimeChange(event: ChangeEvent<HTMLInputElement>): void {
        if(slots) { 
            if (isTimeInThePast(event.target.value)) {
                setErrorMessage('The selected time cannot be in the past.');
                setTime(getTimeNow());
                hideErrorMessage();
            } else if (isSlotAvailable(date, event.target.value, slots)){
                setErrorMessage('The slot for this date and time is not available');
                hideErrorMessage();
            } else {
                setTime(event.target.value);
            }
        }
    }

    const hideErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    };

    // Get the slots
    useEffect(() => {
        async function getSlotsAsync() {
            const { data: allSlots } = await getAllSlots();
            saveSlots(allSlots);
        }

        getSlotsAsync();
      }, [])

    return (
        <div className={styles.formComponent}>
            <form className={styles.form}>
                <div className={styles.errorMessageContainer}> 
                    {errorMessage && <p> ERROR </p>}
                </div>
                <div className={styles.inputs}>
                    <div className={styles.inputContainer}>
                        <label htmlFor='date'> Date: </label>
                        <input
                            id="date"
                            name="date"
                            type='date'
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor='time'> Time: </label>
                        <input
                            id="time"
                            name="time"
                            type='time'
                            value={time}
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <TextButton formAction={cancel} text="Cancel"/>
                    <TextButton type="submit" formAction={saveSlot} disabled={slots === null} kind="primary" text="Save"/>
                </div>
            </form>
        </div>
    );
};

export default SlotCreationForm;

