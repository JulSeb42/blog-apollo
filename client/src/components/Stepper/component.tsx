/*=============================================== Stepper component ===============================================*/

import React, { Fragment } from "react"
import { Text, Badge } from "tsx-library-julseb"
import { uuid } from "../../utils"

import * as Styles from "./styles"
import { StepperProps, StepperItemProps } from "./types"

const Item = ({ isActive, children, number, isChecked }: StepperItemProps) => {
    return (
        <Styles.StyledItem $isActive={isActive}>
            {isChecked ? (
                <Badge
                    content="check"
                    size={24}
                    color="secondary"
                />
            ) : (
                <Badge
                    content={number}
                    size={24}
                    color={isActive || isChecked ? "secondary" : "primary"}
                />
            )}

            <Text>{children}</Text>
        </Styles.StyledItem>
    )
}

const Stepper = ({ active }: StepperProps) => {
    const items = ["Global data", "Users", "Categories"]

    return (
        <Styles.StyledStepper>
            {items.map((item, i) => (
                <Fragment key={uuid()}>
                    <Item
                        number={i + 1}
                        isActive={active === i + 1}
                        isChecked={i + 1 < active}
                    >
                        {item}
                    </Item>

                    {i !== items.length - 1 && <Styles.Line />}
                </Fragment>
            ))}
        </Styles.StyledStepper>
    )
}

export default Stepper
