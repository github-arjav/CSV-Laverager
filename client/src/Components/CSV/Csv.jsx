import React, { useState } from 'react'
import Papa from 'papaparse'

import './Csv.css'

const Csv = () => {

    const [fileData, setFileData] = useState([])
    const [fileUploaded, setFileUploaded] = useState(false)
    const [priceCalculated, setPriceCalculated] = useState(false)

    const handleCsvUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    setFileData(results.data)
                },
                error: (error) => {
                    console.error("Error parsing CSV file:", error)
                }
            })
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(fileData.length > 0) setFileUploaded(true)
    } 

    const handlePriceCalculation = () => {
        setPriceCalculated(true)
    }

    return (
        <div className='page'>
            <form onSubmit={handleSubmit}>
                <label id='csv' className='csv-label'>
                    Upload Your CSV File:
                    <input type="file" name="csv" id="csv" accept='.csv' className='file' onChange={handleCsvUpload} />
                </label>
                <input type="submit" className='submit' value="Upload" />
            </form>
            { fileUploaded &&
                <div className="display">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Credit Score</th>
                                <th>Credit Lines</th>
                                <th>Masked Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Email}</td>
                                    <td>{item.Name}</td>
                                    <td>{item['Credit Score']}</td>
                                    <td>{item['Credit Lines']}</td>
                                    <td>{item['Masked Phone Number']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="calculator">
                        {!priceCalculated && <button className='calc' onClick={handlePriceCalculation}>Calculate the Subpcription Price</button>}
                        {
                            priceCalculated &&
                            <label htmlFor="price" id='price'>
                            Subscription Price:
                            <input type="text" className='price' value='123456' disabled/>
                        </label>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Csv