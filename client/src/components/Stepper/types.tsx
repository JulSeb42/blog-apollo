/*=============================================== Stepper types ===============================================*/

const stepperPages: number[] = [0, 1, 2]

export type StepperPagesTypes = keyof typeof stepperPages

export interface StepperProps {
    active: 1 | 2 | 3
}

export interface StepperItemProps {
    isActive?: boolean
    children?: any
    number?: number
    isChecked?: boolean
}
