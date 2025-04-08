import React from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCheckItem from './AddCheckItem';
import SwipeAction from '../_common/SwipeAction';

function CheckItem({ list, setList, isEdit }) {

  return (
      <div>
        {
          <FormGroup>
            {
              list.map((item, i)=>(
                <div key={i} style={{ pointerEvents: isEdit ? 'auto' : 'none' }}>
                  <SwipeAction>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={!isEdit}
                          icon={<RadioButtonUncheckedIcon/>}
                          checkedIcon={<CheckCircleIcon/>}
                          sx={{
                            color: 'rgba(0, 0, 0, 0.3)',
                            '&.Mui-checked': {color: '#2288FD'},
                          py: '16px',
                          }}
                        />
                      }
                      label={item}
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontFamily: 'NanumSquare, Roboto'
                        },
                      }}
                    />
                  </SwipeAction>
                </div>
              ))
            }
          </FormGroup>
        }

        {/* 아이템 추가 */}
        {isEdit && (
          <AddCheckItem onAdd={(newItem) => {
            if (newItem.trim()) setList((prev) => [...prev, newItem])
          }} />
        )}
      </div>
  )
}

export default CheckItem