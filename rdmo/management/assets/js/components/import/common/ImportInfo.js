import React from 'react'
import PropTypes from 'prop-types'
import {isUndefined} from 'lodash'

const renderElementLengthInfo = (label, length) => length > 0
  && <span>{gettext(label)}: {length} </span>

const ImportInfo = ({
                      elementsLength,
                      updatedLength,
                      createdLength,
                      changedLength,
                      warningsLength,
                      errorsLength
                    }) => {
  if (isUndefined(elementsLength) || elementsLength === 0) {
    return null
  }

  return (
    <div className="pull-right">
      {renderElementLengthInfo('Total', elementsLength)}
      {renderElementLengthInfo('Updated', updatedLength)}
      {updatedLength > 0 && <span>{' ('}{gettext('Changed')}{': '}{changedLength}{') '}</span>}
      {renderElementLengthInfo('Created', createdLength)}
      {renderElementLengthInfo('Warnings', warningsLength)}
      {renderElementLengthInfo('Errors', errorsLength)}
    </div>
  )
}

ImportInfo.propTypes = {
  elementsLength: PropTypes.number,
  updatedLength: PropTypes.number,
  createdLength: PropTypes.number,
  changedLength: PropTypes.number,
  warningsLength: PropTypes.number,
  errorsLength: PropTypes.number,
}

export default ImportInfo