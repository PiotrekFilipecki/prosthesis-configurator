import * as JsPdfModule from 'jspdf';
import html2canvas from 'html2canvas';
import { getObjectEntries } from './object';
import type { DetailsState } from '../types/details';
import type {
  GenerateSummaryPdfInput,
  PersonalizeState
} from '../types/personalize';

type JsPdfInstance = InstanceType<typeof JsPdfConstructor>;

const JsPdfConstructor = JsPdfModule.jsPDF || JsPdfModule.default || JsPdfModule;

function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0] ?? '';
}

function addMeasurements(doc: JsPdfInstance, details: DetailsState, startLine: number): number {
  let line = startLine;

  doc.setFontSize(15);
  doc.text('Measurements:', 10, line);
  doc.line(10, line + 2, 200, line + 2);

  line += 12;
  doc.setFontSize(12);

  getObjectEntries(details.measurments).forEach(([, measurement]) => {
    doc.text(`${measurement.label}: ${measurement.value} ${measurement.unit}`, 10, line);
    line += 10;
  });

  return line + 5;
}

function addColors(
  doc: JsPdfInstance,
  personalize: PersonalizeState,
  startLine: number
): void {
  let line = startLine;
  let column = 10;

  doc.setFontSize(15);
  doc.text('Colors:', 10, line);
  doc.line(10, line + 2, 200, line + 2);

  line += 12;
  doc.setFontSize(12);

  getObjectEntries(personalize.type[personalize.active_type]).forEach(([, element], index) => {
    doc.text(`${element.name}: ${element.selectedColor} ${element.selectedFinishing}`, column, line);

    if (index % 2 === 0) {
      column = 100;
      return;
    }

    column = 10;
    line += 10;
  });
}

function addOrderInfo(doc: JsPdfInstance, details: DetailsState): void {
  doc.addPage('a4', 'p');
  doc.setFontSize(15);
  doc.text('Details:', 10, 20);
  doc.line(10, 25, 200, 25);

  doc.setFontSize(12);
  let line = 35;

  getObjectEntries(details.orderInfo).forEach(([, field]) => {
    doc.text(`${field.label}: ${field.value}`, 10, line);
    line += 10;
  });

  doc.text(`Date: ${getCurrentDate()}`, 10, line);
  line += 12;

  doc.setFontSize(10);
  const disclaimer = doc.splitTextToSize(
    'Coloring and design may be slightly different than in the configurator. All information is given in good faith and based on our present knowledge. We recommend that all customers verify all details before confirming the final order.',
    185
  );
  doc.text('Disclaimer:', 10, line + 8);
  doc.text(disclaimer, 10, line + 14);
  doc.text('https://glazeprosthetics.com/', 10, 292);
}

export async function generateSummaryPdf({
  targetElement,
  details,
  personalize
}: GenerateSummaryPdfInput): Promise<void> {
  const canvas = await html2canvas(targetElement);
  const { width, height } = targetElement.getBoundingClientRect();
  const scale = 200 / Math.floor(width);
  const doc = new JsPdfConstructor();

  doc.addImage(
    canvas,
    'PNG',
    5,
    20,
    Math.floor(width) * scale,
    Math.floor(height) * scale,
    'prosthetic-preview',
    'NONE'
  );

  doc.setFont('Helvetica');
  doc.setFontSize(15);
  doc.text(
    `Model: ${personalize.model_names[personalize.active_type].name} ${
      details.side === 'L' ? 'Left' : 'Right'
    }`,
    10,
    128
  );

  const nextLine = addMeasurements(doc, details, 143);
  addColors(doc, personalize, nextLine);

  doc.setFontSize(10);
  doc.text('https://glazeprosthetics.com/', 10, 292);

  addOrderInfo(doc, details);
  doc.save('prosthetics_doc.pdf');
}
