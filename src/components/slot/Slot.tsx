import { CalendarSlot } from '@/types/Calendar';
import React from 'react';
import styles from './Slot.module.css';
import { User } from '@/types/Users';
import { formatDate, formatTime } from '@/utils/dateAndTime';

export interface SlotPropType {
    user: User;
    slot: CalendarSlot;
}

const Slot: React.FC<SlotPropType> = (props): JSX.Element => {
    return (
        <div className={styles.slot}>
            <div className={styles.main}>
                <div className={styles.date}>
                    <p> {formatDate(props.slot.date)} </p>
                    <p> {formatTime(props.slot.date)} </p>
                </div>
                <div className={styles.content}>
                    {
                        props.user.type === 'coach' ?
                        (
                            <div> {props.slot.coach.phoneNumber} </div>
                        )
                        :
                        (
                            <div> {props.slot.call?.student.phoneNumber} </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Slot;