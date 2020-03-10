import { map } from 'rxjs/operators';
import { restClient } from '../restClient';
import printJS from 'print-js';

export const getReceipts = () => {
  return restClient({
    method: 'GET',
    url: `/legalcabinet/api/v1/receipts`,
  }).pipe(map(({ data }) => data));
};

export const createReceipts = (data: any) => {
  return restClient({
    method: 'POST',
    data,
    url: `/legalcabinet/api/v1/receipts`,
  }).pipe(map(({ data }) => data));
};

export const sendInvoiceReceipts = ({ data, receiptId }: { receiptId: number; data: { email: string } }) => {
  return restClient({
    method: 'PUT',
    data,
    url: `/legalcabinet/api/v1/receipts/${receiptId}/send-invoice`,
  }).pipe(map(({ data }) => data));
};

export const downloadReceipts = ({ id, type }: { id: number; type: string }) => {
  const actions = ({ content, fileName }: { content: string; fileName: string }) => {
    const linkSource = `data:application/pdf;base64,${content}`;
    const downloadLink = document.createElement('a');
    switch (type) {
      case 'Print':
        printJS({ printable: content, type: 'pdf', base64: true });
        break;
      case 'Download':
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        break;
    }
  };

  return restClient({
    method: 'GET',
    url: `/legalcabinet/api/v1/receipts/${id}/download-invoice`,
  }).pipe(map(({ data }) => actions(data)));
};
