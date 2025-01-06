import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";
import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 70) {
          clearInterval(timer);
          setTimeout(() => {
            router.push("/result");
          }, 0);
          return 70;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <Card className="" shadow="none">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-black",
            track: "stroke-black/10",
            value: "text-3xl font-semibold text-black",
          }}
          showValueLabel={true}
          strokeWidth={4}
          value={progress}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-black/30",
            content: "text-black/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          분석중입니다
        </Chip>
      </CardFooter>
    </Card>
  );
}
