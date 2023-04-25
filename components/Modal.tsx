import * as React from "react";
import { Button, Col, Row } from "react-bootstrap";
import A from "react-bootstrap/Modal";

export class modalConfig {
  title: string = "";
  message?: string = "";
  before?: JSX.Element = (<div></div>);
  after?: JSX.Element = (<div></div>);
  buttons: Array<{
    text?: string;
    variant?: string;
    before?: JSX.Element;
    after?: JSX.Element;
    alt?: string;
    onClick: () => void;
  }> = [];
  closeButton?: boolean = false;
}

interface ModalProps {
  fullscreen?: boolean;
  show: boolean;
  config: modalConfig;
  onHide: () => void;
}

interface ModalState {
  show: false;
}

class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = { show: false };
  }
  render() {
    return (
      <A
        onHide={() => this.props.onHide()}
        show={this.props.show}
        {...(this.props.fullscreen !== undefined &&
          this.props.fullscreen && { fullscreen: true })}
        style={{ maxHeight: "90%" }}
        className="p-0"
      >
        {this.props.show && (
          <div>
            <A.Header closeButton>
              <A.Title>
                <Row>
                  <Col>{this.props.config.title}</Col>
                </Row>
              </A.Title>
            </A.Header>
            <A.Body>
              {this.props.config.before != undefined &&
                this.props.config.before}
              {this.props.config.message}
              {this.props.config.after != undefined && this.props.config.after}
            </A.Body>
            <A.Footer>
              {this.props.config.buttons != undefined &&
                this.props.config.buttons.map((e) => {
                  //  const total =  12/this.props.config.buttons.length;
                  return (
                    <Col md key={e.text!}>
                      <Button
                        variant={e.variant}
                        className="w-100"
                        title={e.alt}
                        onClick={() => e.onClick()}
                      >
                        {e.text}
                      </Button>
                    </Col>
                  );
                })}
            </A.Footer>
          </div>
        )}
      </A>
    );
  }
}

export default Modal;
