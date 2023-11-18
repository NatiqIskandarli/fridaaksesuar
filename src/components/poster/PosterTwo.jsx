import Image from "next/image";
import Link from "next/link";

const PosterTwo = (props) => {
    return (
      <div className={`axil-poster ${props.section ? props.section : ""}`}>
        <div className="container">
          <div className={`row ${props.row ? props.row : "" }`}>
            <div className={`col-lg-4 ${props.column ? props.column : ""}`}>
              <div className="single-poster">
                <Link href="/">
                  <Image
                    src={props.leftThumb ?? "/images/product/poster/poster1.png"}
                    alt="poster"
                    width={570}
                    height={491}
                  />
                  <div className="poster-content">
                    <div className="inner">
                      <h3 className="title">
						{props.leftTitle ?? " "}
                      </h3>
                      <span className="sub-title">
                        Collections <i className="fal fa-long-arrow-right" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className={`col-lg-4 ${props.column ? props.column : ""}`}>
              <div className="single-poster">
                <Link href="/">
                  <Image
                    src={props.leftThumb ?? "/images/product/poster/poster2.png"}
                    alt="poster"
                    width={570}
                    height={491}
                  />
                  <div className="poster-content">
                    <div className="inner">
                      <h3 className="title">
						{props.leftTitle ?? " "}
                      </h3>
                      <span className="sub-title">
                        Collections <i className="fal fa-long-arrow-right" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className={`col-lg-4 ${props.column ? props.column : ""}`}>
              <div className="single-poster">
                <Link href="/">
                  <Image
                    src={props.rightThumb ?? "/images/product/poster/poster3.png"}
                    alt="poster"
                    width={570}
                    height={491}
                  />
                  <div className="poster-content content-left">
                    <div className="inner">
                      <span className="sub-title">{props.rightSubtitle ?? "50% Offer In Winter"}</span>
                      <h3 className="title">
					  {props.rightTitle ?? "  "}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default PosterTwo;