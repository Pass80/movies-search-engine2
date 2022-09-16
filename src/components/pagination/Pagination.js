import React from 'react';
import './Pagination.css';

export default function Pagination({ noOfPages, currentPage, onSelect }) {
    return (
        <div>
            {currentPage > 1 && (
                <>
                    <button
                        className="btn"
                        onClick={() => onSelect(currentPage - 1)}
                    >
                        {'<'}
                    </button>
                    <button className="btn" onClick={() => onSelect(1)}>
                        1
                    </button>
                </>
            )}
            {currentPage > 3 && <span className="points">...</span>}

            {currentPage > 2 && (
                <button
                    className="btn"
                    onClick={() => onSelect(currentPage - 1)}
                >
                    {currentPage - 1}
                </button>
            )}

            <button className="btn selected" disabled>
                {currentPage}
            </button>

            {currentPage < noOfPages - 1 && (
                <button
                    className="btn"
                    onClick={() => onSelect(currentPage + 1)}
                >
                    {currentPage + 1}
                </button>
            )}

            {currentPage < noOfPages - 2 && <span className="points">...</span>}

            {currentPage < noOfPages && (
                <>
                    <button className="btn" onClick={() => onSelect(noOfPages)}>
                        {noOfPages}
                    </button>
                    <button
                        className="btn"
                        onClick={() => onSelect(currentPage + 1)}
                    >
                        {'>'}
                    </button>
                </>
            )}
        </div>
    );
}
