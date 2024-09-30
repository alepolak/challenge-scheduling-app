import { CalendarSlot } from '@/types/Calendar';
import React from 'react';
import styles from './Slot.module.css';
import { User } from '@/types/Users';
import { formatDate, formatTime } from '@/utils/dateAndTime';
import CoachSlot from './coach-slot/CoachSlot';
import StudentSlot from './student-slot/StudentSlot';

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
                            <CoachSlot slot={props.slot}/>
                        )
                        :
                        (
                            <StudentSlot student={props.user} slot={props.slot}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Slot;