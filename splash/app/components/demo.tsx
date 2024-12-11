import { TerminalIcon } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import { Video } from './video';

export const Demo = () => (
  <section id="demo" className="grid grid-cols-3">
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center gap-2 text-neutral-500">
        <TerminalIcon size={14} />
        <small>CLI Installation</small>
      </div>
      <h2 className="font-bold text-4xl tracking-tight">
        <Balancer>Get from zero to production in minutes.</Balancer>
      </h2>
      <p className="text-neutral-500">
        Getting started is as easy as running a single command.
      </p>
    </div>
    <div className="col-span-2">
      <Video
        controls={false}
        playing
        muted
        loop
        url="https://youtu.be/4LRXL6l-FS4"
        aspectRatio="3440 / 2160"
      />
    </div>
  </section>
);
