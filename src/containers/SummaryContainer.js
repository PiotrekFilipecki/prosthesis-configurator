import React, { Component } from 'react';
import { connect } from 'react-redux';
import { images } from '../imagesList';
import {
  SummaryWrapper,
  SummaryLine,
  SummaryOverlay
} from '../component/Summary';
import { Button, ButtonsWrapper } from '../component/Buttons';
import {
  ImagesWrapper,
  ImagesWrapperLeft,
  ImageElement
} from '../component/ImageElement';
import { FormField, FormFieldOrder, FormWrapper } from '../component/Form';
import { onInputMeasurment, onInputOrderInfo } from '../actions/index';
// import logo from '../logo.png';
import downloadIco from '../component/download-pdf.svg';

import * as jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const logo =
  'data:image/png;base64,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';

const mapDispatchToProps = dispatch => {
  return {
    onInput: param => dispatch(onInputMeasurment(param)),
    onInputOrder: param => dispatch(onInputOrderInfo(param))
  };
};

class SummaryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOverlay: false
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onOrderFormChangeInput = this.onOrderFormChangeInput.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.onClickGeneratePdf = this.onClickGeneratePdf.bind(this);
  }

  onClickGeneratePdf() {
    const { details, personalize } = this.props;
    this.setState({ showOverlay: true });
    const renderImage = document.getElementsByClassName('image-wrapper')[0];
    // renderImage.style.width = "450px";
    html2canvas(renderImage).then(canvas => {
      // get image size
      const width = Math.floor(renderImage.getClientRects()[0].width);
      const height = Math.floor(renderImage.getClientRects()[0].height);

      const scale = 200 / width;

      // const data = {
      //   image: canvas.toDataURL('image/jpeg', 0.5),
      //   data: {
      //     width: width,
      //     height,
      //     1: 'Test text UO! '
      //   }
      // };

      // fetch('http://localhost:5000/pdf', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      //   .then(res => res.arrayBuffer())
      //   .then(res => {
      //     const blob = new Blob([res], { type: 'application/octet-stream' });
      //     const fileName = 'myFileName.pdf';
      //     saveAs(blob, fileName);
      //     console.log('Succ', res);
      //   });
      let doc = new jsPDF();
      doc.addImage(logo, 'PNG', 10, 5);
      doc.addImage(
        canvas,
        'PNG',
        5,
        20,
        width * scale,
        height * scale,
        'protet',
        'NONE'
      );

      doc.setFont('Helvetica');
      // doc.text('This is your personalized prosthetic', 10, 150);
      doc.setFontSize(15);
      doc.text(
        `Model: ${personalize.model_names[personalize.active_type].name} ${
          details.side === 'L' ? 'Left' : 'Right'
        } `,
        10,
        128
      );
      // doc.text(`Side: ${details.side} `, 10, 180);

      doc.setFontSize(15);
      // doc.setFontStyle('bold');
      doc.text('Measurements: ', 10, 143);
      doc.line(10, 145, 200, 145);

      doc.setFontSize(12);
      doc.setFontStyle('normal');
      let line = 155;

      // var tbl = document.createElement('table');
      // var tblBody = document.createElement('tbody');
      // const mes = [];
      for (let key in details.measurments) {
        // table but doesnt work
        // const row = document.createElement('tr');
        // const cell1 = document.createElement('td');
        // const cell2 = document.createElement('td');
        // const cellText1 = document.createTextNode(
        //   details.measurments[key].label
        // );
        // const cellText2 = document.createTextNode(
        //   `${details.measurments[key].value} ${details.measurments[key].unit} `
        // );
        // cell1.appendChild(cellText1);
        // cell2.appendChild(cellText2);
        // row.appendChild(cell1);
        // row.appendChild(cell2);

        // tblBody.appendChild(row);

        doc.text(
          `${details.measurments[key].label}: ${
            details.measurments[key].value
          } ${details.measurments[key].unit} `,
          10,
          line
        );
        line += 10;
      }

      line += 15;
      doc.setFontSize(15);
      // doc.setFontStyle('bold');
      doc.text('Colors: ', 10, line);
      line += 5;
      doc.line(10, line, 200, line);

      line += 10;
      doc.setFontSize(12);
      let x_pos = 10;
      Object.keys(personalize.type[personalize.active_type]).map((key, i) => {
        doc.text(
          `${personalize.type[personalize.active_type][key].name}: ${
            personalize.type[personalize.active_type][key].selectedColor
          } ${
            personalize.type[personalize.active_type][key].selectedFinishing
          }`,
          x_pos,
          line
        );
        if (i % 2 === 0) x_pos = 100;
        else {
          x_pos = 10;
          line += 10;
        }
      });
      // tbl.setAttribute("border", "2");
      // tbl.appendChild(tblBody)
      // doc.fromHTML(tbl.html(), 10, 180);

      doc.setFontSize(10);
      doc.text(`https://glazeprosthetics.com/ `, 10, 292);
      doc.addPage('a4', 'p');

      doc.setFontSize(15);
      doc.text('Details: ', 10, 20);
      doc.line(10, 25, 200, 25);

      doc.setFontSize(12);
      let lineDetails = 35;
      for (let key in details.orderInfo) {
        doc.text(
          `${details.orderInfo[key].label}: ${details.orderInfo[key].value} `,
          10,
          lineDetails
        );
        lineDetails += 10;
      }

      doc.text(
        `Date: ${  new Date().toISOString().split('T')[0]} `,
        10,
        lineDetails
      );
      lineDetails += 10;

      doc.setFontSize(10);
      doc.text(`Disclaimer:`, 10, 255);
      doc.text(
        `Coloring and design may be slightly different then it’s occur in configurator.`,
        10,
        260
      );
      doc.text(
        `All information is given in good faith and based on our present knowledge.`,
        10,
        265
      );
      doc.text(
        `We make great efforts to give you the best product we can.`,
        10,
        270
      );
      doc.text(
        `Also we always welcome and appreciate any feedback which can help us to improve the advice we offer.`,
        10,
        275
      );
      doc.text(
        `We always recommend that all customers should check thoroughly for themselves to be certain that`,
        10,
        280
      );
      doc.text(
        `they can complete everything to their own satisfaction.`,
        10,
        285
      );
      doc.text(`https://glazeprosthetics.com/ `, 10, 292);
      doc.save('prosthetics_doc.pdf');
      this.setState({ showOverlay: false });
    });
  }
  onChangeInput(id, input) {
    this.props.onInput({ id, input });
  }

  onOrderFormChangeInput(id, input) {
    this.props.onInputOrder({ id, input });
  }

  renderForm() {
    const { details } = this.props;
    return Object.keys(details.orderInfo).map((key, i) => (
      <FormField
        key={key}
        id={key}
        type="text"
        label={details.orderInfo[key].label}
        onChange={this.onOrderFormChangeInput}
        touched={details.orderInfo[key].touched}
        valid={details.orderInfo[key].valid}
        value={details.orderInfo[key].value}
      />
    ));
  }

  renderImages() {
    const { personalize } = this.props;
    return Object.keys(personalize.type[personalize.active_type]).map(
      (key, i) => (
        <ImageElement
          key={`img_el_${i}`}
          {...personalize.type[personalize.active_type][key]}
          type={personalize.active_type}
        />
      )
    );
  }

  render() {
    const { app, personalize, details } = this.props;
    return (
      <div className="col-wrapper summary">
        <div className=" summary-image summary-col-3">
          <SummaryLine
            title={'Model'}
            center
            content={`${
              personalize.model_names[personalize.active_type].name
            } - ${details.side === 'L' ? 'Left' : 'Right'}`}
          />

          {this.props.details.side === 'L' ? (
            <ImagesWrapperLeft>{this.renderImages()}</ImagesWrapperLeft>
          ) : (
            <ImagesWrapper>{this.renderImages()}</ImagesWrapper>
          )}
          <div className="summary-color-details">
            {Object.keys(personalize.type[personalize.active_type]).map(
              (key, i) => (
                <p>
                  <strong>
                    {personalize.type[personalize.active_type][key].name}:{' '}
                  </strong>
                  {personalize.type[personalize.active_type][key].selectedColor}{' '}
                  {
                    personalize.type[personalize.active_type][key]
                      .selectedFinishing
                  }
                </p>
              )
            )}
          </div>
        </div>

        <div className="summary-order-info summary-col-2">
          {Object.keys(details.orderInfo).map((key, i) => (
            <SummaryLine
              title={details.orderInfo[key].label}
              content={`${details.orderInfo[key].value}`}
            />
          ))}
          <div className="date">
            Date: {new Date().toISOString().split('T')[0]}{' '}
          </div>
          {/* <FormWrapper>
            {this.renderForm()}

          </FormWrapper> */}
        </div>
        <div className="summary-measurements summary-col-1">
          {Object.keys(details.measurments).map((key, i) => (
            <SummaryLine
              title={details.measurments[key].label}
              content={`${details.measurments[key].value} ${
                details.measurments[key].unit
              }`}
            />
          ))}
        </div>

        <ButtonsWrapper>
          <Button
            onClick={this.onClickGeneratePdf}
            label={'Download PDF'}
            className="btn-download-pdf"
          >
            <img src={downloadIco} />
          </Button>
        </ButtonsWrapper>
        {this.state.showOverlay && <SummaryOverlay />}
      </div>
    );
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(SummaryContainer);
